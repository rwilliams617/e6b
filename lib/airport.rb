Airport = Struct.new(:code, :lat, :lng) do

	def initialize(**args)
		args.each do |method_name, value|
			self.send(:"#{method_name}=", value)
		end
	end

end

		# :from => "LHR",
	 #  :from_lat => 51.4700223,
	 #  :from_lng => -0.4542955
	 #  :to_lat => 40.6413111,
	 #  :to_lng => -73.77813909999999,