import { Button } from "@mui/material";

const LoginModal = props => {
    if (!props.show) {
        return null;
    }
    return (
        <div className="modal" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">JOIN MEDIUS</h4>
                </div>
                <div className="modal-body">

                    Log in form
                </div>
                <div className="modal-footer">
                    <Button onClick={props.onClose}>
                        Close
                    </Button>
                </div>

            </div>
        </div>
    )
}
export default LoginModal;