package es.system.dc.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class AnswerPerSurvey {
    @SerializedName("answer_count")
    @Expose
    private Integer answer_count;
    @SerializedName("answer_text")
    @Expose
    private String answer_text;
    public AnswerPerSurvey(){}
    public AnswerPerSurvey(Integer answer_count, String answer_text) {
        this.answer_count = answer_count;
        this.answer_text = answer_text;
    }

    public Integer getAnswer_count() {
        return answer_count;
    }

    public void setAnswer_count(Integer answer_count) {
        this.answer_count = answer_count;
    }

    public String getAnswer_text() {
        return answer_text;
    }

    public void setAnswer_text(String answer_text) {
        this.answer_text = answer_text;
    }
}
