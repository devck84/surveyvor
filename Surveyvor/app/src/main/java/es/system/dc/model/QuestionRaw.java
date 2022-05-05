package es.system.dc.model;

public class QuestionRaw {
    private String question_text;
    private Integer question_id;
    private Integer survey_id;
    private Integer sequence_number;
    private Integer question_type_id;
    private Integer required;
    private Integer next_question_id;
    public QuestionRaw(){}
    public QuestionRaw(String question_text, Integer question_id, Integer survey_id, Integer sequence_number, Integer question_type_id, Integer required, Integer next_question_id) {
        this.question_text = question_text;
        this.question_id = question_id;
        this.survey_id = survey_id;
        this.sequence_number = sequence_number;
        this.question_type_id = question_type_id;
        this.required = required;
        this.next_question_id = next_question_id;
    }

    public String getQuestion_text() {
        return question_text;
    }

    public void setQuestion_text(String question_text) {
        this.question_text = question_text;
    }

    public Integer getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(Integer question_id) {
        this.question_id = question_id;
    }

    public Integer getSurvey_id() {
        return survey_id;
    }

    public void setSurvey_id(Integer survey_id) {
        this.survey_id = survey_id;
    }

    public Integer getSequence_number() {
        return sequence_number;
    }

    public void setSequence_number(Integer sequence_number) {
        this.sequence_number = sequence_number;
    }

    public Integer getQuestion_type_id() {
        return question_type_id;
    }

    public void setQuestion_type_id(Integer question_type_id) {
        this.question_type_id = question_type_id;
    }

    public Integer getRequired() {
        return required;
    }

    public void setRequired(Integer required) {
        this.required = required;
    }

    public Integer getNext_question_id() {
        return next_question_id;
    }

    public void setNext_question_id(Integer next_question_id) {
        this.next_question_id = next_question_id;
    }
}
