import { Button } from "antd"
import { FC } from "react"
import { useLocation, useNavigate } from "react-router-dom"


const BtnEditArticle: FC<{ id: number }> = ({ id }) => {
    const navigate = useNavigate()
    const location = useLocation()


    return (
        <Button
            type="link"
            size="small"
            onClick={() => navigate('/art-edit/' + id, { state: location.search })}
        >修改
        </Button>

    )
}

export default BtnEditArticle


