package es.system.dc.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Survey {
    @SerializedName("survey")
    @Expose
    private List<SurveyRaw> survey;

    public List<SurveyRaw> getSurvey() {
        return survey;
    }

    public void setSurvey(List<SurveyRaw> survey) {
        this.survey = survey;
    }
}

