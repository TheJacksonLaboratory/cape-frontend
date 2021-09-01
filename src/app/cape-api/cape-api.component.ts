import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'cape-api',
  templateUrl: './cape-api.component.html',
  styleUrls: ['./cape-api.component.scss']
})

export class CapeApiComponent implements OnInit {

  selectedTab: any;

  bashGetToken = `TOKEN=$(curl -s -X POST -H 'Accept: application/json' -H 'Content-Type: application/json' --data '{"username":"{myusername}","password":"{mypassword}","rememberMe":false}' https://bhcape01.jax.org/api/auth/login | jq -r '.access_token’)`;

  pythonGetToken =
    `import requests, json
data = { 'username' : 'myusername', 'password' : 'mypassword' }
r = requests.post('https://bhcape01.jax.org/api/auth/login', data=json.dumps(data), verify=False)
token = json.loads(r.text)['access_token']`;

  javaGetToken =
    `import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
  
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
  
public class Login {
    public static void main(String[] args) throws Exception {
        // start HTTP POST to get a token
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost("http://bhcape01.jax.org/api/auth/login");

        // send the username and password
        List<NameValuePair> nvps = new ArrayList<>();
        nvps.add(new BasicNameValuePair("username", "myusername"));
        nvps.add(new BasicNameValuePair("password", "mypassword"));
        httpPost.setEntity(new UrlEncodedFormEntity(nvps));
 
        // make the call and print the token
        try (CloseableHttpResponse response = httpClient.execute(httpPost)) {
            HttpEntity entity = response.getEntity();
            String token = EntityUtils.toString(entity, StandardCharsets.UTF_8);
            System.out.println(token);
        }
    }
}`;

  rGetToken =
    `library(httr)
secret = "{username: myusername, password: mypassword}"
token <- POST (url = "https://bhcape01.jax.org/api/auth/login", 
               add_headers("API-KEY" = "xxx", "VERSION" = "1", 
                           "Content-Type" = "application/json; charset=UTF-8",
                           "Accept" = "application/json; charset=UTF-8"), 
                           body = "{username: myusername, password: mypassword}")`;

  authResponse =
    `{
    "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Mjk4OTQ2NDEsIm5iZiI6MTYyOTg5NDY0MSwianRpIjoiYmJkYzY0ZTAtOTFkNy00MzYyLWI0ODktODg5OTVjNjExMjhmIiwiZXhwIjoxNjMyNDg2NjQxLCJpZGVudGl0eSI6eyJ1c2VyX2lkIjoyLCJmaXJzdF9uYW1lIjoiQmFoYSIsImxhc3RfbmFtZSI6IkVsIEthc3NhYnkiLCJlbWFpbCI6IkJhaGEuRWxLYXNzYWJ5QGpheC5vcmciLCJ1c2VybmFtZSI6ImVsa2FzYiIsInJvbGVzIjp7ImFkbWluIjpmYWxzZSwidXNlciI6dHJ1ZX0sImNvbmZpcm1lZCI6dHJ1ZSwiZ3JvdXBzIjpbInJlc2VhcmNoLXdpZGUtdXNlcnMiLCJDR1JQLWJoY2FwZTAybGQiLCJDLUJJRyIsIkNHUlAtc3VtbmVyLWxvZ2luIiwiQVpSLTJGQS1QaWxvdCIsIkdDUC1nZWRpLXNhbmRib3gtbmMtMDEtVXNlciIsInJzdHVkaW8tdXNlcnMiLCJPMzY1LVZpc2lvLVBsYW4yIiwiQ0dSUC13aW50ZXItbG9naW4iLCJDR1JQLWJoY2FwZTAxIiwiQk9YLUpBWF9BbGxfVXNlcnMiLCJHUlAtQkhfSERyaXZlX01pZ3JhdGlvbiIsIkNHUlAtY3RtdnIwMWx0IiwiTzM2NS1GYWN1bHR5LUEzLUJhc2UiLCJHUlAtV2ViRXhVc2VycyIsIkdSUC1BQUQtSVQtUGlsb3QiLCJWUE4tMkZBIiwiR29vZ2xlVXNlcnMiLCJFeGNoYW5nZSAyMDEzIFVzZXJzIiwiQ0dSUC1oZWxpeCIsImNzLWFsbCIsImNhcnRlcmxhYiIsIkNHUlAtY2FydGVyZGV2IiwiaHBjLXVzZXJzIiwiQURNLVN0cmljdFBhc3N3b3JkcyIsIkZBU1BFWC1VU0VSUyIsIkNHUlAtZG9ua2V5IiwiY3NzYyIsImNvbXBzY2kiXX0sInR5cGUiOiJyZWZyZXNoIn0.8n0eQWP1qLWDuOdNCvfFukqe5zNQr3EdY3HbRdWeE3Y",
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Mjk4OTQ2NDEsIm5iZiI6MTYyOTg5NDY0MSwianRpIjoiZDUwZThiNmUtY2E0ZS00YWFlLTg4YzctNWFiNzY2ZDIwNzdhIiwiZXhwIjoxNjI5ODk1NTQxLCJpZGVudGl0eSI6eyJ1c2VyX2lkIjoyLCJmaXJzdF9uYW1lIjoiQmFoYSIsImxhc3RfbmFtZSI6IkVsIEthc3NhYnkiLCJlbWFpbCI6IkJhaGEuRWxLYXNzYWJ5QGpheC5vcmciLCJ1c2VybmFtZSI6ImVsa2FzYiIsInJvbGVzIjp7ImFkbWluIjpmYWxzZSwidXNlciI6dHJ1ZX0sImNvbmZpcm1lZCI6dHJ1ZSwiZ3JvdXBzIjpbInJlc2VhcmNoLXdpZGUtdXNlcnMiLCJDR1JQLWJoY2FwZTAybGQiLCJDLUJJRyIsIkNHUlAtc3VtbmVyLWxvZ2luIiwiQVpSLTJGQS1QaWxvdCIsIkdDUC1nZWRpLXNhbmRib3gtbmMtMDEtVXNlciIsInJzdHVkaW8tdXNlcnMiLCJPMzY1LVZpc2lvLVBsYW4yIiwiQ0dSUC13aW50ZXItbG9naW4iLCJDR1JQLWJoY2FwZTAxIiwiQk9YLUpBWF9BbGxfVXNlcnMiLCJHUlAtQkhfSERyaXZlX01pZ3JhdGlvbiIsIkNHUlAtY3RtdnIwMWx0IiwiTzM2NS1GYWN1bHR5LUEzLUJhc2UiLCJHUlAtV2ViRXhVc2VycyIsIkdSUC1BQUQtSVQtUGlsb3QiLCJWUE4tMkZBIiwiR29vZ2xlVXNlcnMiLCJFeGNoYW5nZSAyMDEzIFVzZXJzIiwiQ0dSUC1oZWxpeCIsImNzLWFsbCIsImNhcnRlcmxhYiIsIkNHUlAtY2FydGVyZGV2IiwiaHBjLXVzZXJzIiwiQURNLVN0cmljdFBhc3N3b3JkcyIsIkZBU1BFWC1VU0VSUyIsIkNHUlAtZG9ua2V5IiwiY3NzYyIsImNvbXBzY2kiXX0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.jzhHmda5-Zq0KZdIXXBmNv2yGPYmbQzhyOk9-ljLgoE"
}`;

  userRegisterParameters =
    `{first_name: '', last_name: '', 
 username: '', email: '', 
 password: ''}`;

  addDatafileParameters =
    `{'file':fileblob} +
HTTP header:
{'Content-Type': 'multipart/form-data',
'Authorization': 'access_token'}`;
  userConfirmParameters = `/{email_token}`;
  userResponse = `{'message': 'Success message'}, Status code`;
  dataFileIdAuthParams =
    `{'datafile_id':'integer'} +
HTTP header:
{ 'Content-Type': 'application/json', 
'Authorization': 'access_token' }`;

  authParameter =
    `HTTP header:
{ 'Content-Type': 'application/json', 
'Authorization': 'access_token' }`;
  bashGetCurrentUser = `curl -H 'Accept: application/json' -H "Authorization: Bearer \${TOKEN}" https://bhcape01.jax.org/api/user/current`;
  pythonGetCurrentUser =
    `import requests
response = requests.get('https://bhcape01.jax.org/api/user/current', headers={'Authorization': 'access_token'})`;
  javaGetCurrentUser =
    `HttpURLConnection connection = null;
try{
    // Created URL for connection
    URL url = new URL("https://bhcape01.jax.org/api/user/current");
  
    // Created connection
    connection = (HttpURLConnection) url.openConnection();
    connection.setInstanceFollowRedirects(false);
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Content-Type", "application/json");
    connection.setRequestProperty("charset", "utf-8");
    connection.setRequestProperty("Authorization", "Bearer" + "access_token");
  
    // getting a response
    int responseCode = connection.getResponseCode();
    if (responseCode == HttpURLConnection.HTTP_OK){
        response = convertToString(connection.getInputStream());
        return response;
    }else{
        // Read Error
        String response = connection.getResponseMessage();
        return response;
    }
 } catch (MalformedURLException e) {
    e.printStackTrace();
 } catch (ProtocolException p) {
    p.printStackTrace();
 } catch (IOException i) {
    i.printStackTrace();
 } finally {
    connection.disconnect();
 }`;
  rGetUserCurrent =
    `library(httr)
secret = "{username: myusername, password: mypassword}"
response <- GET (url = "https://bhcape01.jax.org/api/user/current", 
                 add_headers("Authorization" = paste("Bearer", <access_token>), 
                             "Content-Type" = "application/json; charset=UTF-8",
                             "Accept" = "application/json; charset=UTF-8")})`;
  datafileIdParameter = `{'datafile_id':'integer'}`;
  datafileIdPhenoParameter =
    `{'datafile_id':'integer',
'phenotype_name':'string'} +
HTTP header:
{ 'Content-Type': 'application/json', 
'Authorization': 'access_token' }`;
  datafileIdPhenosParameter =
    `{'datafile_id':'integer',
'phenotype_names':'string[]'} +
HTTP header:
{ 'Content-Type': 'application/json', 
'Authorization': 'access_token' }`;
  jobIdAuthParameter =
    `{'id':'integer'} +
HTTP header:
{ 'Content-Type': 'application/json', 
'Authorization': 'access_token' }`;
  getStatusResponse =
    `{'state': PENDING,
'current': 0,
'total': 1,
'status': 'Pending...'}`;
  getProgressResponse =
    `{'message': file_content}`;
  getProgressParameters =
    `?id={integer} +
HTTP header:
{ 'Content-Type': 'application/json', 
'Authorization': 'access_token' }`;
  getDeleteParameters =
    `{'id':'integer'} +
HTTP header:
{ 'Content-Type': 'application/json', 
'Authorization': 'access_token' }`;
  getReportParameters =
    `?id={integer}&job_id={integer} +
HTTP header:
{ 'Content-Type': 'application/json', 
'Authorization': 'access_token' }`;
  createReportParameter =
    `{'job_id':'integer'} +
HTTP header:
{ 'Content-Type': 'application/json', 
'Authorization': 'access_token' }`;
  deleteReportParameter =
    `{'report_id':'integer'} +
HTTP header:
{ 'Content-Type': 'application/json', 
'Authorization': 'access_token' }`;
  createParameterParams =
    `{'parameters':[param1:'', param2:''...]} + 
HTTP header:
{ 'Content-Type': 'application/json', 
'Authorization': 'access_token' }`;
  createParameterParamsFull =
    `{ 'parameters': [title: string,
covariate_selection: string[],
trait_selection: string[],
normalize: boolean,
mean_center: boolean,
traits_to_scan: string,
number_of_eigentraits: number,
p_value_correction: string,
pop_type: string,
transform_to_phenospace: boolean,
sls_reference_allele: string,
sls_number_of_permutations: number,
sls_use_kinship: boolean,
sls_alpha_values: string[],
ms_number_to_test: number,
ms_method: string,
ms_peak_density: number;
ms_tolerance: number,
ms_organism: string,
ms_snp_filename: string,
ps_null_size: number,
ps_max_marker_correlation: number,
ps_min_individual_per_genotype: number,
yaml_file: string,
date_created: Date,
user_id: number,
datafile_id: number]}`;
  getParameterFileParams =
    `{'param_id':'integer'} +
HTTP header:
{ 'Content-Type': 'application/json', 
'Authorization': 'access_token' }`;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe(paramsIn => {

      const selectedTabIn = paramsIn.get('selectedTab');
      if (selectedTabIn) {
        this.selectedTab = selectedTabIn;
      }
    });
  }

  private getToc(content: any) {
    // create div
    var div, target;
    // read content into div:
    div.innerHTML = content;

    // create an array of headlines:
    // initialize table of contents(toc) and select all level 1 and 2 headers, reading them into an array:
    var myArrayOfNodes = [].slice.call(div.querySelectorAll("h1, h2"));

    // 
    var toc = document.createElement("ul");
    var pointer = toc;
    var myArrayOfNodes = [].slice.call(div.querySelectorAll("h1, h2"));

    // loop through the array of headlines
    myArrayOfNodes.forEach(
      function (value, key, listObj) {
        console.log(value.tagName + ": " + value.innerHTML);

        // if we have detected a top level headline:
        if ("H1" == value.tagName) {
          // reset the pointer to top level:
          pointer = toc;
        }

        // if we are at top level and we have detected a headline level 2
        if ("H2" == value.tagName && pointer == toc) {
          // create a nested unordered list
          pointer = pointer.appendChild(document.createElement("ul"));
        }

        // for each headline, create a list item with the corresponding HTML content:
        var li = target.appendChild(document.createElement("li"));
        li.innerHTML = value.innerHTML;
      });
  }

}
