class E6b::AirlineSort

  def initialize(sorting_order:)
    @sorting_order = sorting_order
  end

  def sort(rows)
    sorted_rows = rows.sort_by {|row| row[1]}
    @sorting_order == :asc ? sorted_rows : sorted_rows.reverse
  end

end
