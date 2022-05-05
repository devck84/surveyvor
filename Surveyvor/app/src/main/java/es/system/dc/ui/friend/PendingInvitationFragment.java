package es.system.dc.ui.friend;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import es.system.dc.R;
import es.system.dc.adapter.FriendAdapter;
import es.system.dc.adapter.PendingInvitationAdapter;
import es.system.dc.databinding.FragmentPendingInvitationBinding;
import es.system.dc.model.Friend;
import es.system.dc.model.TokenApp;

import java.util.HashMap;
import java.util.Map;

public class PendingInvitationFragment extends Fragment {
    PendingInvitationAdapter invitationAdapter;
    RecyclerView recyclerView;
    View root;
    ConstraintLayout linearLayout;

    private FragmentPendingInvitationBinding binding;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        binding = FragmentPendingInvitationBinding.inflate(inflater, container, false);
        root = binding.getRoot();
        linearLayout = root.findViewById(R.id.pendingLayout);
        loadAdapter();
        return root;
    }

    public void loadAdapter(){
        String token = TokenApp.getTOKEN();
        RequestQueue queue = Volley.newRequestQueue(getContext());
        String url ="https://surveyvor.shocklogic.com/api/invitation/mine";

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Gson gson = new Gson();
                        System.out.println("=========");
                        System.out.println(res);
                        System.out.println("=========");
                        Friend jsonObject = gson.fromJson( res, Friend.class);
                        if(jsonObject.getFriend()==null){
                            ConstraintLayout.LayoutParams params = new ConstraintLayout.LayoutParams(ConstraintLayout.LayoutParams.MATCH_PARENT, ConstraintLayout.LayoutParams.WRAP_CONTENT);
                            params.topMargin = 50;
                            TextView t = new TextView(root.getContext());
                            t.setPadding(150,50,50,50);
                            t.setLayoutParams(params);
                            t.setText("You do not have Pending Invitations");
                            linearLayout.addView(t);
                        }else{
                            invitationAdapter = new PendingInvitationAdapter(getContext(), jsonObject.getFriend());
                            recyclerView = (RecyclerView) getView().findViewById(R.id.recyclerViewInvitation);
                            recyclerView.setAdapter(invitationAdapter);
                            recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
                        }


                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(getContext(), "Whoops! Check your connection", Toast.LENGTH_SHORT).show();
            }
        }){
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
                params.put("Authorization", token);
                return params;
            }
        };

        queue.add(stringRequest);
    }
}
