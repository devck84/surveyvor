package es.system.dc.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Team {
    @SerializedName(value="team", alternate={"teams"})
    @Expose
    private List<TeamRaw> team;

    public List<TeamRaw> getTeam() {
        return team;
    }

    public void setTeam(List<TeamRaw> team) {
        this.team = team;
    }

}
