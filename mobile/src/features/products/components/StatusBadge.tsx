import Badge from "../../../shared/components/Badge";
import type { StockStatus } from "../../../shared/api/types";

type Props = {
    status?: StockStatus;
};

const STATUS: Record<StockStatus, { label: string; color: string; background: string }> = {
    NORMAL: { label: "En stock", color: "#FFFFFF", background: "#374151" },
    FAIBLE: { label: "Stock faible", color: "#B45309", background: "#FEF3C7" },
    RUPTURE: { label: "Rupture", color: "#B91C1C", background: "#FEE2E2" },
};

export default function StatusBadge({ status = "NORMAL" }: Props) {
    return <Badge {...STATUS[status]} />;
}