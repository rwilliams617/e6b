class Flight

	attr_reader :number, :airline, :from, :from_lat, :from_lng, :to, :to_lat, 
	:to_lng, :departure, :speed_kph, :bearing, :aircraft

	def initialize(options = {})
		options.each do |option, value|
			instance_variable_set :"@#{option}", value
		end

		# @number = options[:number]
	 #  @airline = options[:airline]  
	 #  @from = options[:from]  
	 #  @from_lat = options [:from_lat]  
	 #  @from_lng = options[:from_lng]  
	 #  @to = options[:to] 
	 #  @to_lat = options[:to_lat]  
	 #  @to_lng = options[:to_lng]  
	 #  @departure = options[:departure]  
	 #  @speed_kph = options[:speed_kph]  
	 #  @bearing = options[:bearing]  
	 #  @aircraft = options[:aircraft]  
	end

end