package com.example.backend.Utill;


import org.springframework.beans.factory.annotation.Value;
import java.util.Map;

public class JsonReader {

    @Value("${application-prop.filePath}")
    private String filePath;

    public JsonReader(String filePath) {
        this.filePath = filePath;
    }

    public Map<String, String> imageUploadPath() {
//        JSONParser jsonParser = new JSONParser();
//        try (FileReader reader = new FileReader(filePath)) {
//            //Read JSON file
//            Object obj = jsonParser.parse(reader);
//            JSONObject jsonObject = (JSONObject) obj;
//
//            Map<String, String> token = new HashMap<>();
//            token.put("get_productImagePath", jsonObject.get("get_productImagePath") + "");
//            token.put("save_productImagePath", jsonObject.get("save_productImagePath") + "");
//            return token;
//
//        } catch (FileNotFoundException e) {
//            e.printStackTrace();
//
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        return null;
    }


}
