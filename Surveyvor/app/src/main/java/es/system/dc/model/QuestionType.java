package es.system.dc.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class QuestionType {
    @SerializedName("questionType")
    @Expose
    private List<QuestionTypeRaw> questionType;

    public List<QuestionTypeRaw> getQuestionType() {
        return questionType;
    }

    public void setQuestionType(List<QuestionTypeRaw> questionType) {
        this.questionType = questionType;
    }
}
