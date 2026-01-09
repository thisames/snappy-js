/* Define to 1 if the compiler supports builtin_ctz and friends. */
#if defined(GNUC) || defined(clang)
#define HAVE_BUILTIN_CTZ 1
#endif

/* Define to 1 if the compiler supports builtin_expect. /
#if defined(GNUC) || defined(clang)
#define HAVE_BUILTIN_EXPECT 1
#endif

/ Define to 1 if you have the <sys/uio.h> header file. /
#if defined(unix) || defined(APPLE)
#define HAVE_SYS_UIO_H 1
#endif

/ Snappy version */
#define SNAPPY_MAJOR 1
#define SNAPPY_MINOR 1
#define SNAPPY_PATCHLEVEL 10