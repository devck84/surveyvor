package es.system.dc.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class SurveyRaw {
    @SerializedName("survey_id")
    @Expose
    private Integer survey_id;

    @SerializedName("team_id")
    @Expose
    private Integer team_id;

    @SerializedName("privacy_id")
    @Expose
    private Integer privacy_id;

    @SerializedName("survey_name")
    @Expose
    private String survey_name;

    @SerializedName("survey_description")
    @Expose
    private String survey_description;

    @SerializedName("user_id")
    @Expose
    private Integer user_id;

    @SerializedName("button_color")
    @Expose
    private String button_color;

    @SerializedName("background_color")
    @Expose
    private String background_color;

    @SerializedName("date_created")
    @Expose
    private String date_created;

    @SerializedName("active")
    @Expose
    private Integer active;

    public SurveyRaw(){}

    public SurveyRaw(Integer survey_id, Integer team_id, Integer privacy_id, String survey_name, String survey_description, Integer user_id, String button_color, String background_color, String date_created, Integer active) {
        this.survey_id = survey_id;
        this.team_id = team_id;
        this.privacy_id = privacy_id;
        this.survey_name = survey_name;
        this.survey_description = survey_description;
        this.user_id = user_id;
        this.button_color = button_color;
        this.background_color = background_color;
        this.date_created = date_created;
        this.active = active;
    }

    public Integer getSurvey_id() {
        return survey_id;
    }

    public void setSurvey_id(Integer survey_id) {
        this.survey_id = survey_id;
    }

    public Integer getTeam_id() {
        return team_id;
    }

    public void setTeam_id(Integer team_id) {
        this.team_id = team_id;
    }

    public Integer getPrivacy_id() {
        return privacy_id;
    }

    public void setPrivacy_id(Integer privacy_id) {
        this.privacy_id = privacy_id;
    }

    public String getSurvey_name() {
        return survey_name;
    }

    public void setSurvey_name(String survey_name) {
        this.survey_name = survey_name;
    }

    public String getSurvey_description() {
        return survey_description;
    }

    public void setSurvey_description(String survey_description) {
        this.survey_description = survey_description;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public String getButton_color() {
        return button_color;
    }

    public void setButton_color(String button_color) {
        this.button_color = button_color;
    }

    public String getBackground_color() {
        return background_color;
    }

    public void setBackground_color(String background_color) {
        this.background_color = background_color;
    }

    public String getDate_created() {
        return date_created;
    }

    public void setDate_created(String date_created) {
        this.date_created = date_created;
    }

    public Integer getActive() {
        return active;
    }

    public void setActive(Integer active) {
        this.active = active;
    }
}
