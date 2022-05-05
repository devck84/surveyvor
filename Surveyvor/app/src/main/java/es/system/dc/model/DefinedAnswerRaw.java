package es.system.dc.model;

public class DefinedAnswerRaw {
    private Integer defined_answer_id;
    private Integer question_id;
    private String defined_answer_text;
    public DefinedAnswerRaw(){}
    public DefinedAnswerRaw(Integer defined_answer_id, Integer question_id, String defined_answer_text) {
        this.defined_answer_id = defined_answer_id;
        this.question_id = question_id;
        this.defined_answer_text = defined_answer_text;
    }

    public Integer getDefined_answer_id() {
        return defined_answer_id;
    }

    public void setDefined_answer_id(Integer defined_answer_id) {
        this.defined_answer_id = defined_answer_id;
    }

    public Integer getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(Integer question_id) {
        this.question_id = question_id;
    }

    public String getDefined_answer_text() {
        return defined_answer_text;
    }

    public void setDefined_answer_text(String defined_answer_text) {
        this.defined_answer_text = defined_answer_text;
    }
}
