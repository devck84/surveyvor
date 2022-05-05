package es.system.dc.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class User {
    @SerializedName(value="user", alternate={"friend","invitation"})
    @Expose
    private UserRaw user;

    public UserRaw getUser() {
        return user;
    }

    public void setUser(UserRaw user) {
        this.user = user;
    }
}
