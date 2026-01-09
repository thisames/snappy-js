#include <napi.h>
#include <snappy-c.h>
#include <vector>
#include <limits>

const size_t MAX_BUFFER_SIZE = 1024 * 1024 * 1024;

bool ValidateArgs(const Napi::CallbackInfo& info, Napi::Env& env) {
  if (info.Length() < 1) {
    Napi::TypeError::New(env, "Wrong number of arguments. Expected a Buffer.")
        .ThrowAsJavaScriptException();
    return false;
  }

  if (!info[0].IsBuffer()) {
    Napi::TypeError::New(env, "Argument must be a Buffer").ThrowAsJavaScriptException();
    return false;
  }
  return true;
}

Napi::Value Compress(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  if (!ValidateArgs(info, env)) return env.Null();

  Napi::Buffer<char> input = info[0].As<Napi::Buffer<char>>();
  const char* input_data = input.Data();
  size_t input_length = input.Length();

  size_t max_compressed_length = snappy_max_compressed_length(input_length);
  std::vector<char> temp_buffer(max_compressed_length);

  size_t output_length = max_compressed_length;
  snappy_status status = snappy_compress(input_data, input_length,
                                         temp_buffer.data(), &output_length);

  if (status != SNAPPY_OK) {
    Napi::Error::New(env, "Compression failed").ThrowAsJavaScriptException();
    return env.Null();
  }

  return Napi::Buffer<char>::Copy(env, temp_buffer.data(), output_length);
}

Napi::Value Uncompress(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  if (!ValidateArgs(info, env)) return env.Null();

  Napi::Buffer<char> input = info[0].As<Napi::Buffer<char>>();
  const char* input_data = input.Data();
  size_t input_length = input.Length();

  size_t uncompressed_length;
  snappy_status status = snappy_uncompressed_length(input_data, input_length,
                                                     &uncompressed_length);

  if (status != SNAPPY_OK) {
    Napi::Error::New(env, "Invalid compressed data header").ThrowAsJavaScriptException();
    return env.Null();
  }

  if (uncompressed_length > MAX_BUFFER_SIZE) {
    Napi::RangeError::New(env, "Decompression output too large (exceeds 1GB limit)")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  char* output_data = nullptr;
  Napi::Buffer<char> output;

  try {
    output = Napi::Buffer<char>::New(env, uncompressed_length);
    output_data = output.Data();
  } catch (...) {
    Napi::Error::New(env, "Memory allocation failed").ThrowAsJavaScriptException();
    return env.Null();
  }

  status = snappy_uncompress(input_data, input_length,
                             output_data, &uncompressed_length);

  if (status != SNAPPY_OK) {
    Napi::Error::New(env, "Decompression failed").ThrowAsJavaScriptException();
    return env.Null();
  }

  return output;
}

Napi::Value UncompressedLength(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  if (!ValidateArgs(info, env)) return env.Null();

  Napi::Buffer<char> input = info[0].As<Napi::Buffer<char>>();
  const char* input_data = input.Data();
  size_t input_length = input.Length();

  size_t uncompressed_length;
  snappy_status status = snappy_uncompressed_length(input_data, input_length,
                                                     &uncompressed_length);

  if (status != SNAPPY_OK) {
    Napi::Error::New(env, "Could not read uncompressed length").ThrowAsJavaScriptException();
    return env.Null();
  }

  return Napi::Number::New(env, uncompressed_length);
}

Napi::Value IsValidCompressed(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  if (!ValidateArgs(info, env)) return env.Null();

  Napi::Buffer<char> input = info[0].As<Napi::Buffer<char>>();
  const char* input_data = input.Data();
  size_t input_length = input.Length();

  snappy_status status = snappy_validate_compressed_buffer(input_data, input_length);

  return Napi::Boolean::New(env, status == SNAPPY_OK);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "compress"),
              Napi::Function::New(env, Compress));

  exports.Set(Napi::String::New(env, "uncompress"),
              Napi::Function::New(env, Uncompress));

  exports.Set(Napi::String::New(env, "uncompressedLength"),
              Napi::Function::New(env, UncompressedLength));

  exports.Set(Napi::String::New(env, "isValidCompressed"),
              Napi::Function::New(env, IsValidCompressed));

  return exports;
}

NODE_API_MODULE(snappy_native, Init)