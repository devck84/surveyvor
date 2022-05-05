package es.system.dc.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Privacy {
    @SerializedName("privacy")
    @Expose
    private List<PrivacyRaw> privacy;

    public List<PrivacyRaw> getPrivacy() {
        return privacy;
    }

    public void setPrivacy(List<PrivacyRaw> survey) {
        this.privacy = privacy;
    }
}
