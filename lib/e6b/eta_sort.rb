class E6b::EtaSort < E6b::AirlineSort

  def sort(rows)
    sorted_rows = rows.sort_by {|row| row[3]}
    super
  end

end
