import { useState } from "react";

const ModalLogic = () => {
    const [revele, changeRevele] = useState(false);

    function toggle(){
        changeRevele(!revele)
    }

    return{
        revele,
        toggle
    }
};

export default ModalLogic;