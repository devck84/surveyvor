package es.system.dc.model;

public class AnswerRaw {
    private Integer user_answer_id;
    private Integer survey_id;
    private Integer question_id;
    private Integer defined_answer_id;
    private Integer user_id;
    private String survey_answer_text;

    public AnswerRaw(){}

    public AnswerRaw(Integer user_answer_id, Integer survey_id, Integer question_id, Integer defined_answer_id, Integer user_id, String survey_answer_text) {
        this.user_answer_id = user_answer_id;
        this.survey_id = survey_id;
        this.question_id = question_id;
        this.defined_answer_id = defined_answer_id;
        this.user_id = user_id;
        this.survey_answer_text = survey_answer_text;
    }

    public Integer getUser_answer_id() {
        return user_answer_id;
    }

    public void setUser_answer_id(Integer user_answer_id) {
        this.user_answer_id = user_answer_id;
    }

    public Integer getSurvey_id() {
        return survey_id;
    }

    public void setSurvey_id(Integer survey_id) {
        this.survey_id = survey_id;
    }

    public Integer getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(Integer question_id) {
        this.question_id = question_id;
    }

    public Integer getDefined_answer_id() {
        return defined_answer_id;
    }

    public void setDefined_answer_id(Integer defined_answer_id) {
        this.defined_answer_id = defined_answer_id;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public String getSurvey_answer_text() {
        return survey_answer_text;
    }

    public void setSurvey_answer_text(String survey_answer_text) {
        this.survey_answer_text = survey_answer_text;
    }
}
