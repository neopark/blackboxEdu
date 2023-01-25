### [Back](../README.md)

<br>

# Mobile

- [Install](#Install)

- [Debug](#Debug)

- [Release](#Release)

- [Build](#Build)

- [Documents](./documents/README.md)

<br>

## Install

```zsh
npm i;
npm run patch;
```

- Ios

  ```zsh
  cd ./ios;
  pod deintegrate;
  pod install;
  cd ..;
  ```

- Aos

  ```zsh
  cd ./android;
  chmod +x ./gradlew;
  ./gradlew clean;
  ./gradlew buildBasicDebug;
  cd ..;
  ```

<br>

## Debug

```zsh
npm run debug;
```

- Ios

  ```zsh
  npm run debug-ios;
  ```

- Aos

  ```zsh
  npm run debug-aos;
  ```

<br>

## Release

- Ios

  ```zsh
  npm run release-ios;
  ```

- Aos

  ```zsh
  npm run release-aos;
  ```

<br>

## Build

- Apk

  ```zsh
  cd ./android;
  ./gradlew assembleBasicRelease;
  cd ..;
  ```

- Aab

  ```zsh
  cd ./android;
  ./gradlew bundleBasicRelease;
  cd ..;
  ```

<br>
