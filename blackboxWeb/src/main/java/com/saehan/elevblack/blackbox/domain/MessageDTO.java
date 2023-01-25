package com.saehan.elevblack.blackbox.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageDTO {
    public  int idx;
    public String type;
    public String title;
    public String content;
    public String insUserId;
    public String insDate;
    public Boolean sendYn;
    public String sendDate;
    public Boolean viewYn;
}
