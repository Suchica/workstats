// @ts-ignore
const ProfileList = ({ profileList }) => {
  return (
    <div className="grid grid-cols-2 gap-3 m-4">
      <div>Name / Age :</div>
      <div>
        {profileList.firstName} {profileList.lastName} / 34
      </div>
      <div>Department :</div>
      <div>{profileList.department}</div>
      <div>Rank :</div>
      <div>{profileList.rank}</div>
      <div>Supervisor :</div>
      <div>{profileList.supervisor}</div>
      <div>Assessor :</div>
      <div>{profileList.assessor}</div>
      <div>Assigned PJ :</div>
      <div>{profileList.assignedPj}</div>
      <div>Role :</div>
      <div>{profileList.role}</div>
    </div>
  );
};

export default ProfileList;
