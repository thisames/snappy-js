{
  "targets": [
    {
      "target_name": "snappy_native",
      "sources": [
        "deps/binding.cc",
        "deps/snappy/snappy.cc",
        "deps/snappy/snappy-c.cc",
        "deps/snappy/snappy-sinksource.cc",
        "deps/snappy/snappy-stubs-internal.cc"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "deps/snappy"
      ],
      "defines": [
        "NAPI_DISABLE_CPP_EXCEPTIONS",
        "HAVE_CONFIG_H"
      ],
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "xcode_settings": {
        "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
        "CLANG_CXX_LIBRARY": "libc++",
        "MACOSX_DEPLOYMENT_TARGET": "10.15"
      },
      "msvs_settings": {
        "VCCLCompilerTool": { "ExceptionHandling": 1 }
      },
      "conditions": [
        ["OS=='mac'", {
          "defines": [
            "HAVE_SYS_UIO_H=1",
            "HAVE_BUILTIN_EXPECT=1",
            "HAVE_BUILTIN_CTZ=1"
          ]
        }],
        ["OS=='linux'", {
          "defines": [
            "HAVE_SYS_UIO_H=1",
            "HAVE_BUILTIN_EXPECT=1",
            "HAVE_BUILTIN_CTZ=1"
          ]
        }],
        ["OS=='win'", {
          "defines": [
            "WIN32"
          ]
        }]
      ]
    }
  ]
}

