package es.system.dc.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Question {
    @SerializedName(value="question", alternate={"questions"})
    @Expose
    private List<QuestionRaw> question;

    public List<QuestionRaw> getQuestion() {
        return question;
    }

    public void setQuestion(List<QuestionRaw> question) {
        this.question = question;
    }
}
