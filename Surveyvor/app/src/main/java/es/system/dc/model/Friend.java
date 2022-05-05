package es.system.dc.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Friend {

    @SerializedName(value="friend", alternate={"friends","invitation"})
    @Expose
    private List<UserRaw> friend;

    public List<UserRaw> getFriend() {
        return friend;
    }

    public void setFriend(List<UserRaw> friend) {
        this.friend = friend;
    }

}
