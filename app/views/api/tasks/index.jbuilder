json.tasks do
  json.array! @tasks, :id, :title, :done
end
