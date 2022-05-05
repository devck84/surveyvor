package es.system.dc.model;

public class QuestionTypeRaw {
    private Integer question_type_id;
    private String  question_type_text;
    private String question_type_description;

    public QuestionTypeRaw(){}

    public QuestionTypeRaw(Integer question_type_id, String question_type_text, String question_type_description) {
        this.question_type_id = question_type_id;
        this.question_type_text = question_type_text;
        this.question_type_description = question_type_description;
    }

    public Integer getQuestion_type_id() {
        return question_type_id;
    }

    public void setQuestion_type_id(Integer question_type_id) {
        this.question_type_id = question_type_id;
    }

    public String getQuestion_type_text() {
        return question_type_text;
    }

    public void setQuestion_type_text(String question_type_text) {
        this.question_type_text = question_type_text;
    }

    public String getQuestion_type_description() {
        return question_type_description;
    }

    public void setQuestion_type_description(String question_type_description) {
        this.question_type_description = question_type_description;
    }
}
