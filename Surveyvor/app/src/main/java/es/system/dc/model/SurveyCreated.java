package es.system.dc.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class SurveyCreated {
    @SerializedName("survey")
    @Expose
    private SurveyRaw survey;

    public SurveyRaw getSurvey() {
        return survey;
    }

    public void setSurvey(SurveyRaw survey) {
        this.survey = survey;
    }
}
