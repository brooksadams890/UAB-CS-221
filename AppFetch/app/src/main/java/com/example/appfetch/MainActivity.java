package com.example.appfetch;

import androidx.appcompat.app.AppCompatActivity;

import android.os.AsyncTask;
import android.os.Bundle;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.SimpleAdapter;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JacksonStdImpl;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.channels.Channel;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;



public class MainActivity extends AppCompatActivity {

    private ListView lv;

    String id, listId, name;



    private static String JSON_URL = "https://run.mocky.io/v3/53e4a964-ba8a-4a33-ac55-8eaaffe21006";



    ArrayList<HashMap<String,String>> fetchList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        fetchList = new ArrayList<>();
        lv = findViewById(R.id.listview);

        GetData getData = new GetData();
        getData.execute();


    }



    public class GetData extends AsyncTask<String, String, String> {


        @Override
        protected String doInBackground(String... strings) {
            String current = "";

            try {
                URL url;
                HttpURLConnection urlConnection = null;

                try {
                    url = new URL(JSON_URL);
                    urlConnection = (HttpURLConnection) url.openConnection();

                    InputStream in = urlConnection.getInputStream();
                    InputStreamReader isr = new InputStreamReader(in);

                    int data = isr.read();
                    while (data != -1) {

                        current += (char) data;
                        data = isr.read();

                    }
                    return current;

                } catch (MalformedURLException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                } finally {
                    if (urlConnection != null) {
                        urlConnection.disconnect();
                    }
                }



            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            return current;


        }
        @Override
        protected void onPostExecute(String s) {

            try {
                JSONObject jsonObject = new JSONObject(s);
                JSONArray jsonArray = jsonObject.getJSONArray("App Fetch");

                for (int i = 0; i < jsonArray.length(); i++) {

                    JSONObject jsonObject1 = jsonArray.getJSONObject(i);

                    id = jsonObject1.getString("id");
                    listId = jsonObject1.getString("listId");
                    name = jsonObject1.getString("name");


                    HashMap<String, String> fetch = new HashMap<>();

                    fetch.put("id", id);
                    fetch.put("listId", listId);
                    fetch.put("name", name);

                    fetchList.add(fetch);


                }


            } catch (JSONException e) {
                e.printStackTrace();

            }

            ListAdapter adapter = new SimpleAdapter(
                    MainActivity.this,
                    fetchList,
                    R.layout.row_layout,
                    new String[]{"id", "listId", "name"},
                    new int[]{R.id.textView, R.id.textView1, R.id.textView2});


            lv.setAdapter(adapter);

            ObjectMapper mapper = new ObjectMapper();


               Jackson array = mapper.readValue(, Jackson.class);

            System.out.println((array));

        }



    }}