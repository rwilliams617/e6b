Airport = Struct.new(:code) do

	def initialize(**args)
		args.each do |method_name, value|
			self.send(:"#{method_name}=", value)
		end
	end
end

