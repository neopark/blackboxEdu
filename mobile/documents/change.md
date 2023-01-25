### [Back](./README.md)

<br>

# Change

- [Name](#Name)

- [Version Name](#Version-Name)

- [Version Code](#Version-Code)

- [Product Name](#Product-Name)

- [Package Name](#Package-Name)

- [Signing](#Signing)

- [Type](#Type)

- [Fonts](#Fonts)

- [Icons](#Icons)

- [Boot Splash](#Boot-Splash)

- [Module](#Module)

<br>

## Name

```zsh
#MEMO, #NAME
```

<br>

## Version Name

```zsh
#MEMO, #VERSION_NAME
```

<br>

## Version Code

```zsh
#MEMO, #VERSION_CODE
```

<br>

## Product Name

```zsh
#MEMO, #PRODUCT_NAME
```

<br>

## Package Name

```zsh
#MEMO, #PACKAGE_NAME
```

```zsh
./android/app/src/*/java/<PACKAGE_NAME>/
```

<br>

## Signing

```zsh
#MEMO, #SIGNING
```

```zsh
./android/app/<SIGNING>.jks
```

- Xcode

  - ./ios/app.xcodeproj > TARGETS > app > Signing & Capabilities > All > Signing

    ```zsh
    # TEAM:
    <SIGNING>
    ```

    - [x] Automatically manage signing

<br>

## Type

```zsh
#MEMO, #TYPE
```

```zsh
.env.<TYPE>

./src/images/<TYPE>_app_<"logo" | "icon_144" | "icon_512" | "icon_1024">.png

./android/app/src/main/res/mipmap-<"hdpi" | "mdpi" | "xhdpi" | "xxhdpi" | "xxxhdpi">/<TYPE>_<"ic_launcher" | "ic_launcher_round" | "boot_splash_logo">.png

./ios/app/Images.xcassets/<TYPE>_app_icon.appiconset/

./ios/app/Images.xcassets/<TYPE>_boot_splash_logo.imageset/

./ios/firebases/<TYPE>/GoogleService-Info.plist

./documents/<TYPE>_aps_<"인증서" | "development_인증서">.p12

./documents/<TYPE>_aps_<"인증서" | "development">.cer
```

- Xcode

  - ./ios/app.xcodeproj > PROJECT > app > Info > Configurations

    ```zsh
    # NAME:
    <TYPE><"Debug" | "Release">
    ```

  - Schemes > Manage Schemes...

    ```zsh
    # SCHEME:
    <TYPE><"Debug" | "Release">
    ```

    - [x] Shared

    - Edit... > `<TYPE><"Debug" | "Release">` > `<"Build" | "Run">` > Pre-actions

      ```zsh
      cp "${PROJECT_DIR}/../.env.<TYPE>" "${PROJECT_DIR}/../.env"
      ```

<br>

## Fonts

```zsh
./android/app/src/main/assets/fonts/<FONTS>.<"otf" | "ttf">

./ios/app/fonts/<FONTS>.<"otf" | "ttf">
```

- Xcode

  - app/app > New Group > fonts

  - Finder (Drag)

    ```zsh
    ./ios/app/fonts/<FONTS>.<"otf" | "ttf">
    ```

  - Xcode (Drop)

    - app/app/fonts/

      - [x] Create groups

      - [x] app

<br>

## Icons

```zsh
.env.<TYPE>

./src/images/<TYPE>_app_<"logo" | "icon_144" | "icon_512" | "icon_1024">.png

./android/app/src/main/res/mipmap-<"hdpi" | "mdpi" | "xhdpi" | "xxhdpi" | "xxxhdpi">/<TYPE>_<"ic_launcher" | "ic_launcher_round">.png

./ios/app/Images.xcassets/<TYPE>_app_icon.appiconset/
```

<br>

## Boot Splash

```zsh
#MEMO, #BOOT_SPLASH
```

```zsh
npx react-native generate-bootsplash ./src/images/<TYPE>_app_logo.png --logo-width=100
```

```zsh
./android/app/src/main/res/mipmap-<"hdpi" | "mdpi" | "xhdpi" | "xxhdpi" | "xxxhdpi">/<TYPE>_boot_splash_logo.png

./ios/app/Images.xcassets/<TYPE>_boot_splash_logo.imageset/
```

- Xcode

  - Finder (Drag)

    ```zsh
    ./ios/app/<TYPE>_boot_splash.storyboard
    ```

  - Xcode (Drop)

    - app/app/

      - [x] Create groups

      - [x] app

<br>

## Module

```zsh
#MEMO, #MODULE
```

- @invertase/react-native-apple-authentication

  - jwt-decode

  - react-native-get-random-values

  - uuid

  - Xcode

    - ./ios/app.xcodeproj > TARGETS > app > Signing & Capabilities > All > + Capability

      - Sign in with Apple

- @react-native-seoul/kakao-login

  - Xcode

    - app/app > New File... > Swift File

      ```zsh
      # NAME:
      File.swift
      ```

      - [x] app

      - Create Bridging Header

- @react-native-google-signin/google-signin, @react-native-firebase/app

  ```zsh
  ./android/app/google-services.json

  ./ios/firebases/<TYPE>/GoogleService-Info.plist
  ```

  - Xcode

    - ./ios/app.xcodeproj > TARGETS > app > Build Phases > + New Run Script Phase

      ```zsh
      # NAME:
      Setup Firebase Environment GoogleService-Info.plist

      # POSITION:
      Link Binary With Libraries
      Setup GoogleService-Info.plist
      Copy Bundle Resources
      ```

      - Setup GoogleService-Info.plist

        ```zsh
        GOOGLE_SERVICE_INFO_PLIST=GoogleService-Info.plist
        # #MEMO, #TYPE
        <TYPE>_GOOGLE_SERVICE_INFO_PLIST=${PROJECT_DIR}/firebases/<TYPE>/${GOOGLE_SERVICE_INFO_PLIST}
        <TYPE>_GOOGLE_SERVICE_INFO_PLIST=${PROJECT_DIR}/firebases/<TYPE>/${GOOGLE_SERVICE_INFO_PLIST}
        GOOGLE_SERVICE_INFO_PLIST_DESTINATION=${BUILT_PRODUCTS_DIR}/${PRODUCT_NAME}.app
        if [ "${CONFIGURATION}" == "<TYPE>Debug" ]
        then
        cp "${<TYPE>_GOOGLE_SERVICE_INFO_PLIST}" "${GOOGLE_SERVICE_INFO_PLIST_DESTINATION}"
        fi
        if [ "${CONFIGURATION}" == "<TYPE>Release" ]
        then
        cp "${<TYPE>_GOOGLE_SERVICE_INFO_PLIST}" "${GOOGLE_SERVICE_INFO_PLIST_DESTINATION}"
        fi
        if [ "${CONFIGURATION}" == "<TYPE>Debug" ]
        then
        cp "${<TYPE>_GOOGLE_SERVICE_INFO_PLIST}" "${GOOGLE_SERVICE_INFO_PLIST_DESTINATION}"
        fi
        if [ "${CONFIGURATION}" == "<TYPE>Release" ]
        then
        cp "${<TYPE>_GOOGLE_SERVICE_INFO_PLIST}" "${GOOGLE_SERVICE_INFO_PLIST_DESTINATION}"
        fi
        #
        ```

- @react-native-firebase/app

  - @react-native-firebase/messaging

    - Xcode

      - File > New > Target...

        - Notification Service Extension

          ```zsh
          # NAME:
          ImageNotification
          ```

          - Activate

      - app > Signing & Capabilities > All > + Capability

        - Push Notifications

        - Background Modes

          - [x] Background fetch

          - [x] Remote notifications

      - ./ios/app.xcodeproj > TARGETS

        - ImageNotification

          - General > Deployment Info

            ```zsh
            # VERSION:
            ios 11.0
            ```

          - Build Settings > All > Packaging

            ```zsh
            # PRODUCT_BUNDLE_IDENTIFIER:
            $(PACKAGE_NAME).$(TYPE).ImageNotification
            ```

- react-native-vector-icons

  - Xcode

    - app/app > New Group > icons

    - Finder (Drag)

      ```zsh
      ./node_modules/react-native-vector-icons/Fonts/*.ttf
      ```

    - Xcode (Drop)

      - app/app/icons/

        - [x] Create groups

- @react-native-community/push-notification-ios

  - react-native-push-notification

- react-native-safe-area-context, react-native-screens

  - @react-navigation/native

    - @react-navigation/bottom-tabs

    - @react-navigation/native-stack

    - @react-navigation/drawer

      - react-native-gesture-handler, react-native-reanimated

- react-native-camera

  - react-native-qrcode-scanner

  - react-native-image-picker

- react-native-permissions

  - react-native-camera

  - @react-native-firebase/messaging

<br>
