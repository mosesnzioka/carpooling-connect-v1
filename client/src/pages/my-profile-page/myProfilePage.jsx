import PersonalInformation from "../../components/myprofile/myprofile";
import Mainhomeheader from "../../components/mainHomeHeader/mainhomeheader";
import UpdatePassword from "../../components/password-update/updatepassword";
function MyProfile() {
  return (
    <div>
      <Mainhomeheader />
      <PersonalInformation />
      <UpdatePassword/>
    </div>
  );
}
export default MyProfile;
