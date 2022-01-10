import React, { useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import "./SCSS/UpdatePassword/UpdatePassword.css";


const UpdatePassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
    };


    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Password Updated Successfully");

            navigate("/account");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, alert, navigate, isUpdated]);


    return (
        <>
            {loading ? (<Loader />) : (
                <>
                    <MetaData title="Update Password -- BetterKart" />
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading">Update Password</h2>

                            <form
                                className="updatePasswordForm"
                                encType="multipart/form-data"
                                onSubmit={updatePasswordSubmit}
                            >
                                <div className="loginPassword">
                                    <VpnKeyIcon />
                                    <input type="password" placeholder="Old Password" required value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>

                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input type="password" placeholder="New Password" required value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>

                                <div className="loginPassword">
                                    <LockIcon />
                                    <input type="password" placeholder="Confirm Password" required value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value="Change"
                                    className="updatePasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default UpdatePassword;