import { Button } from "@material-ui/core"
import { useState } from "react"

const EditButton = () =>{
    const [editable,setEditale] = useState(false);
    if(!editable)
    return(
        <Button onClick={()=>setEditale(true)}>Edit</Button>
    )
    else{
        return (
            <div>
                <Button>
                    Save
                </Button>
                <Button onClick={()=>setEditale(false)}>
                    Cancel
                </Button>
            </div>
        )
    }
}
export default EditButton