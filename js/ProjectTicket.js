var agileBoard = require('./AgileBoardModule');
var Backend = require('./Backend');
var UserService = require('./UserService');
var fs = require('fs');

function ProjectTicketController($rootScope, $scope, TicketModal) {
    var that = this;

    $scope.TicketModal = TicketModal;

    var OnTicketSave = function(ticket) {
        that.ticket = ticket;
        that.onTicketUpdate({updTicket: ticket});
        $scope.$apply();
    };

    this.EnableEditing = function(ticket) {
        TicketModal.Show(OnTicketSave);
        TicketModal.SetTicket(ticket);
    };

    $scope.AllUsers = {};
    UserService.AllUsers.forEach(function(user) {
        $scope.AllUsers[user.UserId] = user;
    });

    $rootScope.$on('update-ticket', function() {
        $scope.$apply();
    });
}

module.exports =
    agileBoard.component('abProjectTicket', {
        controller: ['$rootScope', '$scope', 'TicketModal', ProjectTicketController],
        bindings: {
            ticket: '=',
            onTicketUpdate: '&'
        },
        template: fs.readFileSync('./templates/project-ticket.html')
    });