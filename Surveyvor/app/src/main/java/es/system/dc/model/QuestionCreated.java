package es.system.dc.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class QuestionCreated {
    @SerializedName("question")
    @Expose
    private QuestionRaw question;

    public QuestionRaw getQuestion() {
        return question;
    }

    public void setQuestion(QuestionRaw question) {
        this.question = question;
    }
}
