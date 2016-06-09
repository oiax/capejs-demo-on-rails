u = User.new(name: 'alice', password: 'hotyoga')
u.setting_password = true
u.save

u.tasks.create!(title: 'Buy cat food.', done: false)
u.tasks.create!(title: 'Go dentist.', done: true)
u.tasks.create!(title: 'Take out the trash.', done: false)
u.tasks.create!(title: 'Write blogs.', done: false)
