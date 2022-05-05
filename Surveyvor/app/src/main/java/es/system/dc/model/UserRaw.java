package es.system.dc.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.Objects;

public class UserRaw {
    @SerializedName("user_id")
    @Expose
    private Integer user_id;

    @SerializedName("email")
    @Expose
    private String email;

    @SerializedName("first_name")
    @Expose
    private String first_name;

    @SerializedName("family_name")
    @Expose
    private String family_name;

    @SerializedName("avatar")
    @Expose
    private String avatar;

    @SerializedName("telephone")
    @Expose
    private Integer telephone;

    @SerializedName("password")
    @Expose
    private String password;

    @SerializedName("country_code")
    @Expose
    private String country_code;

    public UserRaw() {
    }

    public UserRaw(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public UserRaw(Integer user_id, String email, String first_name, String family_name, String avatar, Integer telephone, String password, String country_code) {
        this.user_id = user_id;
        this.email = email;
        this.first_name = first_name;
        this.family_name = family_name;
        this.avatar = avatar;
        this.telephone = telephone;
        this.password = password;
        this.country_code = country_code;
    }

    public UserRaw(String email, String first_name, String family_name, String avatar, Integer telephone, String password, String country_code) {
        this.email = email;
        this.first_name = first_name;
        this.family_name = family_name;
        this.avatar = avatar;
        this.telephone = telephone;
        this.password = password;
        this.country_code = country_code;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getFamily_name() {
        return family_name;
    }

    public void setFamily_name(String family_name) {
        this.family_name = family_name;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Integer getTelephone() {
        return telephone;
    }

    public void setTelephone(Integer telephone) {
        this.telephone = telephone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCountry_code() {
        return country_code;
    }

    public void setCountry_code(String country_code) {
        this.country_code = country_code;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserRaw user = (UserRaw) o;
        return Objects.equals(user_id, user.user_id) && email.equals(user.email) && Objects.equals(first_name, user.first_name) && Objects.equals(family_name, user.family_name) && Objects.equals(avatar, user.avatar) && Objects.equals(telephone, user.telephone) && Objects.equals(password, user.password) && Objects.equals(country_code, user.country_code);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user_id, email, first_name, family_name, avatar, telephone, password, country_code);
    }
}
