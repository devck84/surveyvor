package es.system.dc.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class TeamCreated {
    @SerializedName(value="team", alternate={"teams"})
    @Expose
    private TeamRaw team;

    public TeamRaw getTeam() {
        return team;
    }

    public void setTeam(TeamRaw team) {
        this.team = team;
    }
}
