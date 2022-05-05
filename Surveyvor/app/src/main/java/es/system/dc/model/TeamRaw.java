package es.system.dc.model;

public class TeamRaw {
    public Integer getTeam_id() {
        return team_id;
    }

    public void setTeam_id(Integer team_id) {
        this.team_id = team_id;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public String getTeam_name() {
        return team_name;
    }

    public void setTeam_name(String team_name) {
        this.team_name = team_name;
    }

    public String getTeam_description() {
        return team_description;
    }

    public void setTeam_description(String team_description) {
        this.team_description = team_description;
    }

    public String getTeam_url_invitation() {
        return team_url_invitation;
    }

    public void setTeam_url_invitation(String team_url_invitation) {
        this.team_url_invitation = team_url_invitation;
    }

    public TeamRaw(){}

    public TeamRaw(Integer team_id, Integer user_id, String team_name, String team_description, String team_url_invitation) {
        this.team_id = team_id;
        this.user_id = user_id;
        this.team_name = team_name;
        this.team_description = team_description;
        this.team_url_invitation = team_url_invitation;
    }

    private Integer team_id;
    private Integer user_id;
    private String team_name;
    private String team_description;
    private String team_url_invitation;

}
