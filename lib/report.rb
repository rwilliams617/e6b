class Report
	
	def initialize(headings:, rows:, sort_strategy:)
		@headings = headings
		@rows = rows.sort_by(&sort_strategy)
	end	

	
	def make_report
		@io = StringIO.new
		make_headings
		make_rows
		@io.string 
  end

  protected
	def make_headings(headings)
		raise "Implement me in the subclass!"
	end

	def make_rows(rows)
		raise "Implement me in the subclass!"
	end

end





