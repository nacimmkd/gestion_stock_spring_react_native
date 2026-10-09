import { useEffect, useState } from "react";
import Dialog from "./Dialog";

type Props = {
    error: string | null;
};

export default function Error({ error }: Props) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (error) setVisible(true);
    }, [error]);

    return (
        <Dialog
            visible={visible}
            title="Erreur"
            message={error ?? ""}
            onConfirm={() => setVisible(false)}
        />
    );
}