import { Filter, CheckCircle, Clock, XCircle, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type PromotionStatus = 'all' | 'active' | 'scheduled' | 'expired' | 'trash';

interface PromotionFiltersProps {
  selectedFilter: PromotionStatus;
  onFilterChange: (filter: PromotionStatus) => void;
}

export const PromotionFilters = ({ selectedFilter, onFilterChange }: PromotionFiltersProps) => {
  return (
    <div className="flex items-center gap-2">
      <Filter size={16} className="text-muted-foreground" />
      <Select value={selectedFilter} onValueChange={(value) => onFilterChange(value as PromotionStatus)}>
        <SelectTrigger className="w-[200px]" aria-label="Filtrar promociones">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            <div className="flex items-center gap-2">
              <Filter size={16} />
              <span>Todas</span>
            </div>
          </SelectItem>
          <SelectItem value="active">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-success" />
              <span>Activas</span>
            </div>
          </SelectItem>
          <SelectItem value="scheduled">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              <span>Programadas</span>
            </div>
          </SelectItem>
          <SelectItem value="expired">
            <div className="flex items-center gap-2">
              <XCircle size={16} className="text-muted-foreground" />
              <span>Vencidas</span>
            </div>
          </SelectItem>
          <SelectItem value="trash">
            <div className="flex items-center gap-2">
              <Trash2 size={16} className="text-destructive" />
              <span>Papelera</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
