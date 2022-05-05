package es.system.dc.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Country {
    @SerializedName("name")
    @Expose
    public String name;
    @SerializedName("dial_code")
    @Expose
    public String dial_code;
    @SerializedName("code")
    @Expose
    public String code;
}
