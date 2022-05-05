package es.system.dc.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class TeamMember {
    @SerializedName(value="team_member", alternate={"team_members"})
    @Expose
    private List<UserRaw> user;

    public List<UserRaw> getUser() {
        return user;
    }

    public void setUser(List<UserRaw> user) {
        this.user = user;
    }
}
