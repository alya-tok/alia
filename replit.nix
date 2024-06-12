{ pkgs }: {
  deps = [
    pkgs.nodejs_18
    pkgs.yarn
    pkgs.jellyfin-ffmpeg
    pkgs.libwebp
    pkgs.imagemagick
    pkgs.libuuid
  ];
  env = {
    LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
      pkgs.libuuid
    ];
  };
}