import { SignIn } from "@clerk/clerk-react";

function Auth() {
    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
                <SignIn />
                <div style={{ position: "absolute", bottom: "0px", left: "0px", width: "100%", height: "60px", backgroundColor: "white", borderRadius: "10px" }}></div>
            </div>
        </div>
    )
}

export default Auth