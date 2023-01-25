package com.saehan.elevblack.blackbox.domain;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FcmTokenDTO {
    int idx;
    String fcmToken;
    String deviceId;
}
