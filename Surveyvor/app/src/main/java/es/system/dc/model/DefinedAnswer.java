package es.system.dc.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class DefinedAnswer {
    @SerializedName(value="definedAnswer", alternate={"definedAnswers","defined_answer"})
    @Expose
    private List<DefinedAnswerRaw> definedAnswers;

    public List<DefinedAnswerRaw> getDefinedAnswers() {
        return definedAnswers;
    }

    public void setDefinedAnswers(List<DefinedAnswerRaw> definedAnswers) {
        this.definedAnswers = definedAnswers;
    }
}
