package es.system.dc.model;

public class FriendRaw {
    private Integer user_friend_id;
    private Integer user_id_from;
    private Integer user_id_to;
    private String date_related;

    public FriendRaw(){}

    public FriendRaw(Integer user_friend_id, Integer user_id_from, Integer user_id_to, String date_related) {
        this.user_friend_id = user_friend_id;
        this.user_id_from = user_id_from;
        this.user_id_to = user_id_to;
        this.date_related = date_related;
    }

    public Integer getUser_friend_id() {
        return user_friend_id;
    }

    public void setUser_friend_id(Integer user_friend_id) {
        this.user_friend_id = user_friend_id;
    }

    public Integer getUser_id_from() {
        return user_id_from;
    }

    public void setUser_id_from(Integer user_id_from) {
        this.user_id_from = user_id_from;
    }

    public Integer getUser_id_to() {
        return user_id_to;
    }

    public void setUser_id_to(Integer user_id_to) {
        this.user_id_to = user_id_to;
    }

    public String getDate_related() {
        return date_related;
    }

    public void setDate_related(String date_related) {
        this.date_related = date_related;
    }
}
