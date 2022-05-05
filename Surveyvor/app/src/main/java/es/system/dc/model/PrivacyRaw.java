package es.system.dc.model;

public class PrivacyRaw {
    private int privacy_id;
    private String privacy_name;
    private String privacy_description;
    public PrivacyRaw() {
    }
    public PrivacyRaw(int privacy_id, String privacy_name, String privacy_description) {
        this.privacy_id = privacy_id;
        this.privacy_name = privacy_name;
        this.privacy_description = privacy_description;
    }

    public int getPrivacy_id() {
        return privacy_id;
    }

    public void setPrivacy_id(int privacy_id) {
        this.privacy_id = privacy_id;
    }

    public String getPrivacy_name() {
        return privacy_name;
    }

    public void setPrivacy_name(String privacy_name) {
        this.privacy_name = privacy_name;
    }

    public String getPrivacy_description() {
        return privacy_description;
    }

    public void setPrivacy_description(String privacy_description) {
        this.privacy_description = privacy_description;
    }
}
